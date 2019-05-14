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
    const { description } = this.navCtrl.getByIndex(0).data;
    const { index } = this.navCtrl.getByIndex(0).data;

    if (description && index === undefined) {
      const newTask = {
        description: description,
        done: false
      };

      this.tasks.push(newTask);
    } else if (index !== undefined) {
      this.tasks[index].description = description;
    }
  }

  private deleteTask(index: number): void {
    this.tasks.splice(index, 1);
  }

  editTask(description: string, index: number): void {
    const task = {
      description: description,
      index: index
    };

    this.navCtrl.push('TaskPage', task);
  }
}
