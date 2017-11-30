import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'app/trends/services/youtube.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-youtube-player',
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.scss']
})
export class YoutubePlayerComponent implements OnInit {
  public loader = true;
  private embedUrl: any;
  private videoId: any;
  private routerSubs$: Subscription;

  constructor(
    private ytService: YoutubeService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.routerSubs$ = this.router.params.subscribe(
      params => {
        this.videoId = params['id'];

        this.embedUrl = this
          .sanitizer
          .bypassSecurityTrustResourceUrl(
            `https://www.youtube.com/embed/${this.videoId}?autoplay=1`
          );
      }
    );
  }

  public loadVideo(): void {
    this.loader = false;
  }

}
