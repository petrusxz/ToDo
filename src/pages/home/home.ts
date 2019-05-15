import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Task } from '../../models/task.model';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public tasks: Task[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public toastCtrl: ToastController
  ) { }

  ionViewDidLoad(): void {
    this.storage.forEach((value: any, key: string) => {
      this.tasks.push(value);
    })
      .catch(this.handleError);
  }

  // Lifecycles são métodos que estão presentes em toda página Ionic para rastrear eventos de inicialização de páginas. 
  // Mais sobre: https://blog.ionicframework.com/navigating-lifecycle-events/
  ionViewDidEnter(): void {
    // NavParams possui um método específico para recuperar parâmetros de navegação através de um nome de variável    
    const { description, index } = this.navCtrl.getByIndex(0).data;

    if (description && index === undefined) {
      const newTask: Task = {
        description: description,
        done: false,
        id: Math.random().toString().split('.')[1]
      };

      this.tasks.push(newTask);
      this.saveTask(newTask);
    } else if (index !== undefined) {
      this.tasks[index].description = description;
      this.saveTask(this.tasks[index]);
    }
  }

  private deleteTask(index: number): void {
    this.storage.remove(this.tasks[index].id)
      .then(() => {
        this.tasks.splice(index, 1);
        this.presentToast('Item deletado!');
      })
      .catch(this.handleError);
  }

  editTask(description: string, index: number): void {
    this.navCtrl.push('TaskPage', { description: description, index: index });
  }

  markAsDone(task: Task): void {
    task.done = !task.done;
    this.saveTask(task);
  }

  saveTask(task: Task): void {
    this.storage.set(task.id, task)
      .then(() => {
        this.presentToast('Item salvo!');
      })
      .catch(this.handleError);
  }

  presentToast(message: string): void {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });

    toast.present();
  }

  handleError(error: any): void {
    this.presentToast('Ocorreu um erro! Por favor, tente mais tarde.');
    console.error(error);
  }
}
