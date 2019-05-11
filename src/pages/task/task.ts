import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage {

  public description: string; 

  constructor(
    public navCtrl: NavController
  ) { }


  addTask(): void {
    // GetPrevious() é um método do NavController para pegar a página anterior
    const homePage = this.navCtrl.getPrevious();
    // Vamos injetar dentro do NavParams da página anterior a descrição da nova tarefa criando uma variável 'description' dentro de 'data'
    homePage.data.description = this.description;
    
    this.navCtrl.pop();
  }
}
