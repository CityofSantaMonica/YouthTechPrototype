//a view model for binding a list view
function stopsViewModel() {
    //saving a reference to 'this' (the current view model)
    var self = this;
    
    //an array to hold the stops to be bound
    self.stops = ko.observableArray([]);

    //a function to determine if this view model has any stops
    self.hasStops = ko.computed(function () {
        return self.stops().length > 0;
    });

    //a function to add a new stop to the array
    self.addStop = function(stopData) {
        self.stops.push(stopData);
    };

    //a function to compute the average distance of all stops in the array
    self.averageDistance = ko.computed(function() {
        //evaluate the array and save a reference
        var stops = self.stops();
        //save the count
        var count = stops.length;
        //if there are no elements, the average is 0
        if (count < 1){
            return 0;
        }
        else {
            //compute the average
            var sum = 0;
            for (var index = 0; index < count; index++) {
                sum = sum + stops[index].distance;
            }
            return (sum / count);
        }
    });
}
