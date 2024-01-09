import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LanguageService } from 'src/app/services/language.service';
import { StorageService } from 'src/app/services/storage.service';
import { QuestionService } from 'src/app/services/question.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage  {


  question: any = {
    Libelle_question: '',
    categories_id: 1, // Remplacez par l'ID de la catégorie appropriée
    niveaux_id: 1, // Remplacez par l'ID du niveau approprié
    reponses: [
      { choix: '', est_correct: true, points: 3 },
      { choix: '', est_correct: false, points: 0 },
      { choix: '', est_correct: false, points: 0 },
    ],
  };

  constructor(private questionService: QuestionService) {}

  proposerQuestion() {
    this.questionService.saveQuestion(this.question)
      .subscribe(
        (response: HttpResponse<any>) => {
          console.log('Question proposée avec succès', response);
        },
        (error: HttpErrorResponse) => {
          console.error('Erreur lors de la proposition de la question', error);
        }
      );
  }

}
