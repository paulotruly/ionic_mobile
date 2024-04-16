import { Component } from '@angular/core';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public senhasService: SenhasService) {}

  contarSenhasSP(): number {
    // Conta o número de senhas prioritárias (SP) na lista de senhas
    return this.senhasService.senhasArray.SP.length;
  }
}
