fijiApp.controller('eventcontroller', function ($scope, $http) {
  $scope.user = {};
  $scope.data = {};
  $scope.data.events = [
    {
      title: 'Executive Board Voting',
      start: '2018-11-26',
    },
    {
      title: 'Finals Week',
      start: '2018-12-10',
      end: '2018-12-15'
    },
    {
      title: 'Chapter',
      start: '2018-12-02T17:30:00'
    },
    {
      title: 'Thanksgiving Break',
      start: '2018-11-17',
      end: '2018-11-26'
    },
    {
      title: 'Chapter',
      start: '2018-11-11T17:30:00'
    },
    {
      title: 'IFC Meeting',
      start: '2018-11-28T21:15:00',
    },
  ];

  render($scope.data.events);
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
      defaultDate: '2018-11-27',
      navLinks: true, // can click day/week names to navigate views
      editable: true,
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
