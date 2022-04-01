package marketplacebr.springfy.Vehicle.Service;

import marketplacebr.springfy.Vehicle.Entity.Vehicle;
import marketplacebr.springfy.Vehicle.Repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

@Service
public class VehicleService {

    Logger logger = Logger.getLogger(VehicleService.class.getName());

    @Autowired
    private VehicleRepository vehicleRepository;

    public Vehicle save(Vehicle vehicle) {
        logger.info("Save vehicle");
        return vehicleRepository.save(vehicle);
    }

    public List<Vehicle> list() {
        logger.info("List all vehicles");
        return vehicleRepository.findAll();
    }

    public void delete(Vehicle vehicle) {
        logger.info("Delete vehicle");
        vehicleRepository.delete(vehicle);
    }

    public Vehicle searchById(Integer id){
        logger.info("Find vehicle by id");
        return vehicleRepository.findById(id).get();
    }
}