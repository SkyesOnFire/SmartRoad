package marketplacebr.springfy.Vehicle.Controller;

import marketplacebr.springfy.Vehicle.Entity.Vehicle;
import marketplacebr.springfy.Vehicle.Service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/vehicle")
public class VehicleController {

    Logger logger = Logger.getLogger(VehicleService.class.toString());

    @Autowired
    private VehicleService vehicleService;

    @PostMapping
    public Vehicle save(Vehicle vehicle){
        logger.info(vehicle.getPlate());
        logger.info(vehicle.getModel());
        vehicleService.save(vehicle);
        return vehicle;
    }

    @GetMapping
    public List<Vehicle> list(){
        List<Vehicle> vehicles = new ArrayList<>();
        Vehicle v = new Vehicle();
        v.setPlate("IWM-8998");
        v.setModel("328i");
        v.setBrand("BMW");
        vehicles.add(v);
        vehicleService.list();
        return vehicles;
    }

    public void delete(Vehicle vehicle){
        vehicleService.delete(vehicle);
    }

}
