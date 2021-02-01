import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthGuard } from '../../common/guards/auth.guard';
import { Category } from './category.model.i';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  @UseGuards(AuthGuard)
  getCategoryList(@Query() id: number, @Req() req: any): Observable<Category> {
    const userId = req.user?.id || 1;
    id = userId;
    return this.categoryService.getCategoryList$(id);
  }
}
