import { Route } from '@angular/router'
import { ProductService } from '../../data/service/product.service'
import { ProductDetailComponent } from './product-detail.component'


export const routes: Route[] = [
  {
    path: '',
    component: ProductDetailComponent,
    providers: [
      ProductService,
//      provideEffects(editArticleEffects),
  //    provideState(editArticleFeatureKey, editArticleReducer),
    ],
  },
]
