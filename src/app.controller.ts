import { Controller, Get, Post, Query, Redirect, Render, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  @Get('/')
  @Redirect('/index')
  redirectToIndex() {
    return { url: '/index' };
  }

  @Get('/index')
  @Render('index')
  getIndexPage(@Req() req: Request) {
    return {
      title: 'Главная',
      isAuthenticated: req.session.isAuthenticated,
      user: req.session.user,
      features: [
        {
          icon: 'familyicon.png',
          altText: 'Семейная компания',
          text: 'Семейная компания с собственным производством',
        },
        {
          icon: 'calendaricon.png',
          altText: 'Опыт работы',
          text: 'Делаем мебель с 2008 года',
        },
        {
          icon: 'factoryicon.png',
          altText: 'Профессионалы',
          text: 'Специалисты и команда дизайнеров',
        },
      ],
    };
  }

  @Post('/login')
  login(@Req() req: Request, @Res() res: Response) {
    req.session.isAuthenticated = true;
    req.session.user = { name: 'Батманов', surname: 'Артём' };
    const referer = req.headers.referer || '/index';
    res.redirect(referer);
  }

  @Post('/logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.session.destroy(() => {});
    const referer = req.headers.referer || '/index';
    res.redirect(referer);
  }

  @Get('/catalog')
  @Render('catalog')
  getCatalogPage(@Req() req: Request) {
    return {
      title: 'Каталог',
      isAuthenticated: req.session.isAuthenticated,
      user: req.session.user,
      products: [
        {
          altText: 'Knisa светло-серый',
          title: 'ANGERSBY',
          description: 'Knisa светло-серый',
          price: '378,99',
        },
        {
          altText: 'Gunnared светло-зелёный',
          title: 'LANDSKRONA',
          description: 'Gunnared светло-зелёный',
          price: '899,59',
        },
        {
          altText: 'Knisa светло-серый',
          title: 'ANGERSBY',
          description: 'Knisa светло-серый',
          price: '378,99',
        },
        {
          altText: 'Knisa светло-серый',
          title: 'ANGERSBY',
          description: 'Knisa светло-серый',
          price: '378,99',
        },
        {
          altText: 'Knisa светло-серый',
          title: 'ANGERSBY',
          description: 'Knisa светло-серый',
          price: '378,99',
        },
        {
          altText: 'Knisa светло-серый',
          title: 'ANGERSBY',
          description: 'Knisa светло-серый',
          price: '378,99',
        },
        {
          altText: 'Knisa светло-серый',
          title: 'ANGERSBY',
          description: 'Knisa светло-серый',
          price: '378,99',
        },
        {
          altText: 'Knisa светло-серый',
          title: 'ANGERSBY',
          description: 'Knisa светло-серый',
          price: '378,99',
        },
        {
          altText: 'Knisa светло-серый',
          title: 'ANGERSBY',
          description: 'Knisa светло-серый',
          price: '378,99',
        },
      ],
      isCatalog: true,
    };
  }

  @Get('/table')
  @Render('table')
  getTablePage(@Req() req: Request) {
    return {
      title: 'Покупки',
      isAuthenticated: req.session.isAuthenticated,
      user: req.session.user,
      items: [
        {
          name: 'Стул NOLMYRA',
          quantity: 2,
          color: 'светло-серый',
          location: 'Гостиная',
        },
        { name: 'Стол LACK', quantity: 1, color: 'белый', location: 'Кухня' },
      ],
      isTable: true,
    };
  }
}
