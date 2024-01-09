import { Injectable } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SocialshareService {

  image : string ; 
  message="https://github.com/Tagouffo21/dev-mobile.git"; 
  imageForSharing:string;

  ngOnInit() {}
  closeModal() {
    this.modal.dismiss();
  }
  
  constructor(private socialSharing: SocialSharing, private modal: ModalController,
    ) {}
  shareviaWhatsapp() {
    this.socialSharing
      .shareViaWhatsApp(this.message, null, this.imageForSharing)
      .then((reponse) => {
        this.modal.dismiss();
        console.log(reponse);
      })
      .catch((err) => {
        alert(' Impossible de partager les informations');
      });
  }
  shareviaFacebook() {
    this.socialSharing
      .shareViaFacebook(this.message, null, this.imageForSharing)
      .then((success) => {})
      .catch((err) => {
        alert(' Impossible de partager les informations');
      });
  }
  shareviaInstagram() {
    this.socialSharing
      .shareViaInstagram(this.message, this.imageForSharing)
      .then((success) => {})
      .catch(() => {
        alert('Impossible de partager informations');
      });
  }
  shareviaTwitter() {
    this.socialSharing
      .shareViaTwitter(this.message, null, this.imageForSharing)
      .then((success) => {})
      .catch((err) => {
        alert('Impossible de partager les informations');
      });
  }

  SendEmail() {
    this.socialSharing
      .shareViaEmail(this.message, null, [''])
      .then((success) => {})
      .catch((err) => {
        alert('Impossible de partager les informations');
      });
  }
}
