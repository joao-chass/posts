import { Routes } from '@angular/router';
import { PostListComponent } from './features/components/post-list/post-list.component';

export const routes: Routes = [
    { path: '', redirectTo: '/posts', pathMatch: 'full' },
    { path: 'posts', component: PostListComponent },
    { 
      path: 'posts/:id', 
      loadComponent: () => import('./features/components/post-detail/post-detail.component')
        .then(m => m.PostDetailComponent) 
    },
    // { 
    //   path: 'posts/:id/edit', 
    //   loadComponent: () => import('./features/posts/components/post-form/post-form.component')
    //     .then(m => m.PostFormComponent) 
    // },
    // { 
    //   path: 'posts/new', 
    //   loadComponent: () => import('./features/posts/components/post-form/post-form.component')
    //     .then(m => m.PostFormComponent) 
    // },
    { path: '**', redirectTo: '/posts' }
];


