import {Route} from '@angular/router';

export interface NavigationMetadata {
  label: string;
  order: number;
  isVisible?: boolean;
  link?: string;
}

export interface NavigationRouteData {
  navigation: NavigationMetadata;
}

export function withNavigationMetadata(navigation: NavigationMetadata): Route['data'] & NavigationRouteData {
  return { navigation };
}
