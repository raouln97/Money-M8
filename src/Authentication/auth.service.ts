import { createClient } from "@supabase/supabase-js";
import { ForgetPasswordDTO, SignInBodyDTO, SignUpBodyDTO } from "./auth.dto";
import { Response } from "express";
import { TsoaResponse } from "tsoa";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

export class AuthService {
  // private readonly partnerService: PartnerProfileService;

  constructor() {
    //   this.partnerService = new PartnerProfileService();
  }

  async signUp(body: SignUpBodyDTO) {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase.auth.signUp({
      email: body.email,
      password: body.password,
    });

    if (error) {
      console.log(error);
      throw new Error("Error while signing up");
    }

    return data;
  }

  async signIn(body: SignInBodyDTO) {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: body.email,
      password: body.password,
    });

    if (error) {
      console.log(error);
      throw new Error("Error while signing up");
    }

    const accessToken = data.session.access_token;
    const refreshToken = data.session.refresh_token;

    const accessTokenCookie = `accessToken=${accessToken}; HttpOnly; Secure; SameSite=Strict; Max-Age=${
      3600 * 1000
    };`;
    const refreshTokenCookie = `refreshToken=${refreshToken}; HttpOnly; Secure; SameSite=Strict; Max-Age=${
      30 * 24 * 3600 * 1000
    };`;

    return { accessTokenCookie, refreshTokenCookie };
  }

  async forgetPassword(body: ForgetPasswordDTO) {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase.auth.resetPasswordForEmail(
      body.email
    );

    if (error) throw error;

    return data;
  }
}
