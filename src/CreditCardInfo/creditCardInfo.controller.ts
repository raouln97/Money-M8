import {
  Controller,
  Route,
  Get,
  Security,
  Request,
  Path,
  Post,
  Body,
  Put,
  Tags,
  Query,
  Delete,
  Header,
} from "tsoa";
import { CreditCardInformationService } from "./creditCardInfo.service";
import { query } from "express";

@Tags("CreditCard")
@Route("/creditCard")
export class CreditCardInformationController extends Controller {
  private readonly creditCardInformationService: CreditCardInformationService;

  constructor() {
    super();
    this.creditCardInformationService = new CreditCardInformationService();
  }

  @Get("/")
  public async getAllBanks(@Query() bankName: string): Promise<any> {
    return this.creditCardInformationService.getBankCreditCards(bankName);
  }
}
