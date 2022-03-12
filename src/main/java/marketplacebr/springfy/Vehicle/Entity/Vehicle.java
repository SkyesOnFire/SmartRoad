package marketplacebr.springfy.Vehicle.Entity;

public class Vehicle {

    private Integer id;
    private String brand;
    private String model;
    private String plate;
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
