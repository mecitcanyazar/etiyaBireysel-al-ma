import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/features/carts/models/cartItem';
import { CartService } from 'src/app/features/carts/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent   {
  navItems: any[] = [

    {
      label: 'Home',
      routerLink: '/',
      isRouterActiveExact: true,
    },
    {
      label: 'Login',
      routerLink: '/login',
      isRouterActiveExact: false,
    },
    // {
    //   label: 'My Cart',
    //   routerLink: '/carts',
    //   isRouterActiveExact: false,
    // },
  ];





}
