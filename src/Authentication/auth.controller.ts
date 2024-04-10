import {
  Controller,
  Route,
  Get,
  Security,
  Path,
  Post,
  Body,
  Put,
  Tags,
  Query,
  Delete,
  Header,
  Res,
  TsoaResponse,
  SuccessResponse,
  Request,
} from "tsoa";
import { AuthService } from "./auth.service";
import { ForgetPasswordDTO, SignInBodyDTO, SignUpBodyDTO } from "./auth.dto";
import { Response } from "express";
// import { BankInfoService } from "./bankInfo.service";

@Tags("Auth")
@Route("/auth")
export class Authcontroller extends Controller {
  private readonly authService: AuthService;

  constructor() {
    super();
    this.authService = new AuthService();
  }

  @Post("/signUp")
  public async signUp(@Body() body: SignUpBodyDTO): Promise<any> {
    return this.authService.signUp(body);
  }

  @Post("/signIn")
  public async signIn(
    @Body() body: SignInBodyDTO,
    @Res()
    res: TsoaResponse<200, { message: string }, { "Set-Cookie": string[] }>
  ): Promise<any> {
    const cookies = await this.authService.signIn(body);

    res(
      null,
      { message: "Login Successful" },
      {
        "Set-Cookie": [cookies.accessTokenCookie, cookies.refreshTokenCookie],
      }
    );
  }

  @Post("/logout")
  @Security("jwt")
  @SuccessResponse("200", "Logged out successfully")
  public logOut(
    @Res()
    customResponse: TsoaResponse<
      200,
      { message: string },
      { "Set-Cookie": string[] }
    >,
    @Request() req: Express.Request
  ): void {
    // Make sure the Path matches the cookie's Path you're trying to clear
    const cookieOptions =
      " Path=/auth; HttpOnly; Secure; Expires=Thu, 01 Jan 1970 00:00:00 GMT;";

    const clearAccessToken = `accessToken=;${cookieOptions}`;
    const clearRefreshToken = `refreshToken=;${cookieOptions}`;

    customResponse(
      200,
      { message: "Logged out successfully" },
      {
        "Set-Cookie": [clearAccessToken, clearRefreshToken],
      }
    );
  }

  @Post("/forgetPassword")
  public forgetPassword(@Body() body: ForgetPasswordDTO): any {
    return this.authService.forgetPassword(body);
  }
}
