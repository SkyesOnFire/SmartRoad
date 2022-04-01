package marketplacebr.springfy.Vehicle.Entity;

import javax.persistence.*;

@Entity
@Table(name = "VEHICLE")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "BRAND", nullable = false)
    private String brand;

    @Column(name = "MODEL", nullable = false)
    private String model;

    @Column(name = "PLATE", unique = true, nullable = false)
    private String plate;

    @Column(name = "RENAVAM", unique = true, nullable = false)
    private String brRenavam;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getPlate() {
        return plate;
    }

    public void setPlate(String plate) {
        this.plate = plate;
    }

    public String getBrRenavam() {
        return brRenavam;
    }

    public void setBrRenavam(String brRenavam) {
        this.brRenavam = brRenavam;
    }
}
