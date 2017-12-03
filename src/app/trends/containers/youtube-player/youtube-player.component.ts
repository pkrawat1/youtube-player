import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { YoutubeService } from 'app/trends/services/youtube.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-youtube-player',
  templateUrl: './youtube-player.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./youtube-player.component.scss']
})
export class YoutubePlayerComponent implements OnInit {
  // public loader = true;
  public embedUrl$: Observable<SafeResourceUrl>;

  constructor(
    private ytService: YoutubeService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.embedUrl$ = this.router.params.map(
      params => {
        const videoId = params['id'];
        return this
          .sanitizer
          .bypassSecurityTrustResourceUrl(
            `https://www.youtube.com/embed/${videoId}?autoplay=1`
          );
      }
    );
  }

  public loadVideo(): void {
    // this.loader = false;
  }

}
