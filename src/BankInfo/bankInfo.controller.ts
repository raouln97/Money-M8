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
import { BankInfoService } from "./bankInfo.service";

@Tags("Bank")
@Route("/bank")
export class BankInformationController extends Controller {
  private readonly bankInfoService: BankInfoService;

  constructor() {
    super();
    this.bankInfoService = new BankInfoService();
  }

  @Get("/")
  public async getAllBanks(): Promise<any> {
    return this.bankInfoService.getAllBanks();
  }
}
