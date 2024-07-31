import { Component } from '@angular/core';

@Component({
  selector: 'app-audio-chat',
  templateUrl: './audio-chat.component.html',
  styleUrl: './audio-chat.component.scss'
})
export class AudioChatComponent {
  isFullscreen: boolean = true;
  closeFullscreen() {
    this.isFullscreen = false;
    // Aquí puedes emitir un evento para cerrar el componente si es necesario
  }
  
}
