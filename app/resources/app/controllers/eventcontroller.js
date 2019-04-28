fijiApp.controller('eventcontroller', function ($scope, $http) {
  $scope.user = {};
  $scope.data = {};
  $scope.data.events = [
    // {end: "2019-04-19T21:56:02.791Z", start: "2019-04-18T21:56:02.791Z", title: "Event!!!"}
  ];
  // render($scope.data.events);

  $scope.refreshEvents = function(){
    $http({
      method: 'GET',
      url: '/event',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(data=>{
      console.log(data);
      /*
         {
      title: 'Finals Week',
      start: '2018-12-10',
      end: '2018-12-15'
    },
    endDate,
    startDate,
    name
      */
     let events = data.data.map(object=>{
      return {end: object.endDate, start: object.startDate, title: object.name};
     })
     console.log("Clean",events);
     render(events);
    })
    .catch(err=>{
      console.error(err);
    })
  }
  $scope.refreshEvents();
});
function render(inputted_events) {
  console.log("Called",inputted_events)
  $(function () {

    // page is now ready, initialize the calendar...

    $('#calendar').fullCalendar({
      // put your options and callbacks here
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,basicWeek,basicDay'
      },
      defaultDate: new Date(),
      navLinks: true, // can click day/week names to navigate views
      eventLimit: true, // allow "more" link when too many events
      events: inputted_events,
      eventColor: '#663399',
      eventTextColor: 'white'
    });

  });
}
function clearField() {
  document.getElementById("recForm").reset();
}
