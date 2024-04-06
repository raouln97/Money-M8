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
  
  
  @Tags("Test")
  @Route("/test")
  export class PartnerProfileController extends Controller {
    // private readonly partnerService: PartnerProfileService;
  
    constructor() {
      super();
    //   this.partnerService = new PartnerProfileService();
    }
  
    @Post("/")
    public async test(@Body() body:{text: string}): Promise<string> {
      return body.text;
    }
  }
  
