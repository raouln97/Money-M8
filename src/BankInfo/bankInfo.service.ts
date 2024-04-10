import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

export class BankInfoService {
  // private readonly partnerService: PartnerProfileService;

  constructor() {
    //   this.partnerService = new PartnerProfileService();
  }

  async getAllBanks() {
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: ListOfBanks, error } = await supabase
      .from("ListOfBanks")
      .select("*");

    if (error) {
      console.log(error);
      throw new Error("Error Retrieving All Banks");
    }

    return ListOfBanks;
  }
}
