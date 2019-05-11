import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public tasks = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) { }

  // Lifecycles são métodos que estão presentes em toda página Ionic para rastrear eventos de inicialização de páginas. 
  // Mais sobre: https://blog.ionicframework.com/navigating-lifecycle-events/
  ionViewDidEnter(): void {
    // NavParams possui um método específico para recuperar parâmetros de navegação através de um nome de variável
    const taskDescription = this.navParams.get('description');

    if (taskDescription) {
      const newTask = { 
        description: taskDescription, 
        done: false 
      };

      this.tasks.push(newTask);
    }
  }

  navToTask(): void {
    this.navCtrl.push('TaskPage');
  }
}
