import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { catchError, Observable, throwError } from "rxjs";
import { ErrorComponent } from "./error/error.component";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    constructor( private dialog: MatDialog ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe( 
            catchError((e: HttpErrorResponse) => {
                console.log(req.url);
                this.dialog.open(ErrorComponent, {data: {message: e.error.message ?? 'Unknown error.'}});
                return throwError(() => new Error(e.error));
            })
        );
    }
}