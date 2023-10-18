import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessaoService } from 'src/app/service/sessao/sessao.service';
import { MobileHelper } from 'src/app/shared/mobile.helper';
import { environment } from 'src/env/desenv';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { LocalizacaoService } from 'src/app/service/localizacao/localizacao.service';
import { MapComponent } from 'src/app/shared/components/map/map.component';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent {

  token: any;
  criando: boolean = false;
  publicKeyToken = environment.captchaPublicKey;
  geolocalizacao = { x: -22.907920, y: -43.185334 }
  endereco!: string;

  @ViewChild('map') mapComponent!: MapComponent

  constructor(private service: SessaoService,
    private router: Router,
    private recaptchaService: ReCaptchaV3Service,
    private activatedRoute: ActivatedRoute,
    private localizacaoService:  LocalizacaoService,
    private cdr: ChangeDetectorRef) {
  }

  get isAtualizacaoDeToken() {
    return this.activatedRoute.snapshot.data['registrar']
  }

  get isMobile() {
    return MobileHelper.isMobile();
  }

  buscarLocalizacao() {
    this.localizacaoService.get(this.endereco)
      .subscribe((e: any) => {
        this.geolocalizacao.x = e.x;
        this.geolocalizacao.y = e.y
        this.service.armazenarLocalizacao(this.geolocalizacao.x, this.geolocalizacao.y)
        this.redirecionar();
      })
  }


  redirecionar() {
    const token = this.service.getSessao()

    if(token)
      window.location.href = '/home'
      // this.router.navigate(['home'])
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

    // this.recaptchaService.execute('atualizarSessao')
    //     .subscribe((token) => {
    //       this.service.add({ 
    //         x: -22.920100,
    //         y: -43.081100,
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
  }

}
