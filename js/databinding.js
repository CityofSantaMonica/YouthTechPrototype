function stopsViewModel() {
    var self = this;

    self.stops = ko.observableArray([]);

    self.hasStops = ko.computed(function () {
        return self.stops().length > 0;
    });

    self.addStop = function(stopData) {
        self.stops.push(stopData);
    };

    self.averageDistance = ko.computed(function() {
        var stops = self.stops();
        var count = stops.length;

        if (count < 1){
            return 0;
        }
        else {
            var sum = 0;
            for (var index = 0; index < count; index++) {
                sum = sum + stops[index].distance;
            }
            return 1.0 * (sum / count);
        }
    });
}