import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Promo } from './promo.model';
import { PromoService } from './promo.service';


@Controller('promo')
export class PromoController {
  constructor(private promoService: PromoService) {}

  @Get()
  async listPromos(@Query() query): Promise<Promo[] | null> {
    return await this.promoService.getPromos(query);
  }

  @Post()
  async createPromo(@Body() Promo: Promo): Promise<Promo> {
    return await this.promoService.createPromo(Promo);
  }

  @Put('/:id')
  async updatePromo(
    @Res() res,
    @Body() product: Promo,
    @Param('id') id
  ): Promise<Promo> {
    const newPromo = await this.promoService.updatePromo(id, product);
    if (!newPromo) throw new NotFoundException('Update fail');
    return res.status(HttpStatus.OK).json(newPromo);
  }

  @Delete('/:id')
  async deletePromo(@Res() res, @Param('id') id): Promise<Promo> {
    const newPromo = await this.promoService.deletePromo(id);
    if (!newPromo) throw new NotFoundException('Update fail');
    return res.status(HttpStatus.OK).json(newPromo);
  }

  @Post('/getPromo')
  async getPromo(@Body() Promoname: {}): Promise<Promo | null> {
    return await this.promoService.getPromo(Promoname);
  }

}
