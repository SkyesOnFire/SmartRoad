package marketplacebr.springfy.Vehicle.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import marketplacebr.springfy.Vehicle.Entity.Vehicle;
import org.springframework.data.jpa.repository.Query;

public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {

    @Query("select v from Vehicle v where v.plate = :plate")
    public Vehicle findByPlate(String plate);

}