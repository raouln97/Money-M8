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
import { UserCardInfoService } from "./usercards.service";
import { CustomRequest } from "../middleware/auth.middleware";
import { UserCardDTO, UserCardDetailDTO } from "./usercards.dto";

@Tags("UserCards")
@Route("/userCards")
export class UserCardInfoController extends Controller {
  private readonly userCardInfoService: UserCardInfoService;

  constructor() {
    super();
    this.userCardInfoService = new UserCardInfoService();
  }

  @Get("/")
  @Security("jwt")
  public async getUserCards(@Request() req: CustomRequest): Promise<any> {
    return this.userCardInfoService.getUserCreditCards(req.userId);
  }

  @Post("/create")
  @Security("jwt")
  public async createUserCards(
    @Body() userCardsDTO: UserCardDetailDTO,
    @Request() req: CustomRequest
  ): Promise<any> {
    const userCard: UserCardDTO = { ...userCardsDTO, userId: req.userId };
    return this.userCardInfoService.createUserCreditCards(userCard);
  }

  //   @Post("/")
  //   public async updateUserCards(@Query() bankName: string): Promise<any> {}

  //   @Get("/")
  //   public async getAllBanks(@Query() bankName: string): Promise<any> {}
}
