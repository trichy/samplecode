import { Injectable } from '@angular/core';

declare let toastr: any;

@Injectable()
export class ToastrService {

    constructor() {
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": true,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "3000",
            "extendedTimeOut": "3000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
    }

    success(message: string, title?: string): void {
        toastr.success(message, title);
    }
    info(message: string, title?: string): void {
        toastr.info(message, title);
    }
    warning(message: string, title?: string): void {
        toastr.warning(message, title);
    }
    error(message: string, title?: string): void {
        toastr.error(message, title);
    }
}