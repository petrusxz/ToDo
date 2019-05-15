import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage {

  public description: string; 
  public index: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) { 
    this.description = this.navParams.get('description');
    this.index = this.navParams.get('index');
  }

  ionViewDidLoad() {
    this.navCtrl.getPrevious().data = {};
  }

  addTask(): void {
    // GetPrevious() é um método do NavController para pegar a página anterior
    const homePage = this.navCtrl.getPrevious();
    
    // Vamos injetar dentro do NavParams da página anterior a descrição da nova tarefa criando uma variável 'description' dentro de 'data'
    homePage.data.description = this.description;
    homePage.data.index = this.index;
    
    this.navCtrl.pop();
  }
}
