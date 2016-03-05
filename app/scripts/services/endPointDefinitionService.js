/**
 * Created by nijat on 3/5/16.
 */

tick.service('endPointDefinitionService' ,[function () {

  //this.apiURL = 'http://10.9.25.192:8080';
  this.apiURL = 'http://172.16.3.24:8080';


  //Get all tests or create one
  this.testURL = this.apiURL + '/tickfinder/api';

  //get endpoints
  this.getPostURL = this.testURL + '/post';
  this.getContactURL = this.testURL + '/contact';

  //update endpoints
  this.createContactURL = this.testURL + '/contact/:id/?name=:name,email=:email,phone=:phone';
  this.updateContactURL = this.testURL + '/contact?id=:id,name=:name,email=:email,phone=:phone';

  //delete endpoints
  this.deletePostURL = this.testURL + '/post/delete/:id';
  this.deleteContentURL = this.testURL + '/contact/delete/:id';

}]);
