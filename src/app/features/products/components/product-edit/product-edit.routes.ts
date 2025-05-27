import {Route} from '@angular/router'
import { ProductService } from '../../data/service/product.service'
import { ProductEditComponent } from './product-edit.component'


export const routes: Route[] = [
  {
    path: '',
    component: ProductEditComponent,
    providers: [
      ProductService,
//      provideEffects(editArticleEffects),
  //    provideState(editArticleFeatureKey, editArticleReducer),
    ],
  },
]
