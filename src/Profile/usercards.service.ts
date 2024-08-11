import { createClient } from "@supabase/supabase-js";
import { UserCardDTO } from "./usercards.dto";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

export class UserCardInfoService {
  // private readonly partnerService: PartnerProfileService;

  constructor() {
    //   this.partnerService = new PartnerProfileService();
  }

  async getUserCreditCards(userId: string) {
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: userCards, error: bankIdError } = await supabase
      .from("UserCreditCards")
      .select("*")
      .eq("userId", userId);

    return userCards;
  }

  async createUserCreditCards(userCardsDTO: UserCardDTO) {
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: userCards, error: bankIdError } = await supabase
      .from("UserCreditCards")
      .insert(userCardsDTO);

    return userCards;
  }
}
