import { Component } from '@angular/core';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  constructor(public senhasService: SenhasService) {}

  chamarProximaSenha() {
    // Verifica se há senhas na lista
    if (this.senhasService.senhasArray.ST.length > 0) {
      // Ordena a lista de senhas de acordo com as prioridades SP > SE > SG
      this.senhasService.senhasArray.ST.sort((a: string, b: string) => {
        const priorityMap: { [key: string]: number } = { 'SP': 1, 'SE': 2, 'SG': 3 };
        return priorityMap[a.substring(9, 11)] - priorityMap[b.substring(9, 11)];
      });

      // Pega a primeira senha da lista
      const proximaSenha = this.senhasService.senhasArray.ST[0];
      // Remove a senha da lista de senhas
      this.senhasService.senhasArray.ST.shift();
      // Armazena a senha emitida
      this.senhasService.senhaEmitida = proximaSenha;
      return proximaSenha;
    } else {
      // Se não houver senhas na lista, exiba uma mensagem ou tome a ação apropriada
      console.log('Não há mais senhas na fila.');
      return null;
    }
  }
}