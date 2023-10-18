import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessaoService } from 'src/app/service/sessao/sessao.service';
import { MobileHelper } from 'src/app/shared/mobile.helper';
import { environment } from 'src/env/desenv';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {

  token: any;
  criando: boolean = false;
  publicKeyToken = environment.captchaPublicKey;

  constructor(private service: SessaoService,
    private router: Router,
    private recaptchaService: ReCaptchaV3Service,
    private activatedRoute: ActivatedRoute) {
  }

  get isAtualizacaoDeToken() {
    return this.activatedRoute.snapshot.data['registrar']
  }

  get isMobile() {
    return MobileHelper.isMobile();
  }

  atualizarToken() {
    debugger;
    const token = this.activatedRoute.snapshot.params['token'];
    navigator.geolocation.getCurrentPosition((position) => {
      const x = position.coords.latitude
      const y = position.coords.longitude

      this.recaptchaService.execute('atualizarSessao')
        .subscribe((token) => {
          console.log(token)
        })

      // this.service.atualizarToken(token, x, y)
      //   .subscribe((res) => {
      //     this.redirecionar();
      //   })
    })
  }

  ngOnInit(): void {
    this.verificarToken();
    this.redirecionar();
    this.criar();
  }

  verificarToken() {
    if(this.isAtualizacaoDeToken) {
      this.atualizarToken();
      return;
    }
  }

  resolveToken(args: any) {
    console.log(args);
  }

  redirecionar() {
    const token = this.service.getSessao()

    if(token)
      this.router.navigate(['home'])
  }

  criar() {
    // Ajustar para SSL
    // navigator.geolocation.getCurrentPosition((position) => {
    //   this.recaptchaService.execute('atualizarSessao')
    //     .subscribe((token) => {
    //       this.service.add({ 
    //         x: position.coords.latitude,
    //         y: position.coords.longitude,
    //         token: token
    //       }).subscribe((res: any) => {
    //           this.service.armazenarSessao(res.token);
              
    //           if(this.isMobile) {
    //             this.redirecionar();
    //           } else {
    //             this.token = res.token;
    //           }
    //         })
    //     })
    // });

    this.recaptchaService.execute('atualizarSessao')
        .subscribe((token) => {
          this.service.add({ 
            x: -22.920100,
            y: -43.081100,
            token: token
          }).subscribe((res: any) => {
              this.service.armazenarSessao(res.token);
              
              if(this.isMobile) {
                this.redirecionar();
              } else {
                this.token = res.token;
              }
            })
        })
  }

}
