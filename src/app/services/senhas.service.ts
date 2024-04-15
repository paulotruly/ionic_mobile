import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SenhasService {

  public senhasGeral: number = 0;
  public senhasPrior: number = 0;
  public senhasExame: number = 0;
  public senhasTotal: number = 0; 
  public inputNovaSenha: string = '';
  public senhaRemovida: string = ''; // Adicionando a propriedade para armazenar a última senha removida
  public removendoSP: boolean = true; // Inicialmente estamos removendo uma senha SP

  constructor() {}

  public senhasArray : any = {
    'SP': [],
    'SE': [],
    'SG': [],
    'ST': []
  };

  public senhaEmitida: string = ''

  somaGeral() {
    this.senhasGeral++; this.senhasTotal++;
  }

  somaPrior() {
    this.senhasPrior++; this.senhasTotal++;
  }

  somaExame() {
    this.senhasExame++; this.senhasTotal++;
  }








  

  public chamarSenha() {
    let listaSenhas = this.senhasArray;

    // Verifica se ainda há senhas na lista
    if (listaSenhas.ST.length > 0) {
        // Se estamos removendo uma senha SP
        if (this.removendoSP && listaSenhas.ST.some((senha: string) => senha.includes('SP'))) {
            let indexSP: number = listaSenhas.ST.findIndex((senha: string) => senha.includes('SP'));
            if (indexSP !== -1) {
                this.senhaRemovida = listaSenhas.ST[indexSP]; // Armazenando a última senha removida
                listaSenhas.ST.splice(indexSP, 1);
                console.log("Senha SP removida: " + this.senhaRemovida);
            }
        } 
        // Se estamos removendo uma senha SE ou SG
        else if (!this.removendoSP && (listaSenhas.ST.some((senha: string) => senha.includes('SE')) || listaSenhas.ST.some((senha: string) => senha.includes('SG')))) {
            // Filtra as senhas disponíveis para remoção (SE ou SG)
            let senhasDisponiveis = listaSenhas.ST.filter((senha: string) => senha.includes('SE') || senha.includes('SG'));
            // Seleciona aleatoriamente uma das senhas disponíveis
            let index = Math.floor(Math.random() * senhasDisponiveis.length);
            if (index !== -1) {
                this.senhaRemovida = senhasDisponiveis[index]; // Armazenando a última senha removida
                listaSenhas.ST.splice(listaSenhas.ST.indexOf(senhasDisponiveis[index]), 1);
                console.log("Senha SE ou SG removida: " + this.senhaRemovida);
            }
        }

        // Alternar entre remover SP e SE/SG
        this.removendoSP = !this.removendoSP;
    } else {
        console.log("Lista de senhas vazia.");
    }

    return this.senhaRemovida; // Retorna a última senha removida
}











  novaSenha(tipoSenha: string = '') {
    if (tipoSenha == 'SG') {
      this.somaGeral();
      this.inputNovaSenha = 
        new Date().getFullYear().toString().substring(2, 4) +
        new Date().getMonth().toString().padStart(2, '0') +
        new Date().getDay().toString().padStart(2, '0') +
        '-' +
        tipoSenha +
        (this.senhasArray['SG'].length + 1).toString().padStart(2, '0');
      this.senhasArray.SG.push(this.inputNovaSenha);
      this.senhasArray.ST.push(this.inputNovaSenha);
    } else if (tipoSenha == 'SP') {
      this.somaPrior();
      this.inputNovaSenha = 
        new Date().getFullYear().toString().substring(2, 4) +
        new Date().getMonth().toString().padStart(2, '0') +
        new Date().getDay().toString().padStart(2, '0') +
        '-' +
        tipoSenha +
        (this.senhasArray['SP'].length + 1).toString().padStart(2, '0');
      this.senhasArray.SP.push(this.inputNovaSenha);
      this.senhasArray.ST.push(this.inputNovaSenha);
    } else if (tipoSenha == 'SE') {
      this.somaExame();
      this.inputNovaSenha = 
        new Date().getFullYear().toString().substring(2, 4) +
        new Date().getMonth().toString().padStart(2, '0') +
        new Date().getDay().toString().padStart(2, '0') +
        '-' +
        tipoSenha +
        (this.senhasArray['SE'].length + 1).toString().padStart(2, '0');
      this.senhasArray.SE.push(this.inputNovaSenha);
      this.senhasArray.ST.push(this.inputNovaSenha);
    }
    console.log(this.senhasArray);  
  }
}
