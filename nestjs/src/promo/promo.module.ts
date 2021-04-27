
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { PromoController } from './promo.controller';
import { Promo } from './promo.model';
import { PromoService } from './promo.service';


@Module({
    imports: [TypegooseModule.forFeature([Promo])],
    providers: [PromoService],
    controllers: [PromoController]
})
export class PromoModule { }