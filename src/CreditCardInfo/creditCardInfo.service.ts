import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

export class CreditCardInformationService {
  // private readonly partnerService: PartnerProfileService;

  constructor() {
    //   this.partnerService = new PartnerProfileService();
  }

  async getBankCreditCards(bankName: string) {
    console.log(bankName);
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: bankId, error: bankIdError } = await supabase
      .from("ListOfBanks")
      .select("id")
      .eq("Bank_Name", bankName)
      .single();

    if (bankIdError) {
      console.log(bankIdError);
      throw new Error("Error Retrieving Bank Id");
    }

    console.log(bankId);

    const { data: listOfCreditCards, error } = await supabase
      .from("ListOfCreditCards")
      .select("*")
      .eq("bankId", bankId.id);

    if (error) {
      console.log(error);
      throw new Error("Error Credit Card Info");
    }

    return listOfCreditCards;
  }
}
