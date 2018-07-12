import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientService} from '../../services/client.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Client} from '../../models/Client';
import {SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {};
  disableBalanceOnEdit: boolean;

  constructor(private clientService: ClientService,
              private router: Router,
              private route: ActivatedRoute,
              private flashMessage: FlashMessagesService,
              private settingsService: SettingsService) {
  }

  ngOnInit() {
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
    // get id from url
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    // get the client
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
    });
  }

  onSubmit({value, valid}: { value: Client, valid: boolean }) {
    if (!valid) {
      this.flashMessage.show('Please fill out the form correctly',
        {cssClass: 'alert-danger', timeout: 4000});
    } else {
      // add id to client
      value.id = this.id;
      // update the client
      this.clientService.updateClient(value);
      this.flashMessage.show('Client updated',
        {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/client/' + this.id]);
    }

  }

}
