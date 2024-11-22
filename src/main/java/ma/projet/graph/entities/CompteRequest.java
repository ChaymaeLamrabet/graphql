package ma.projet.graph.entities;

import lombok.Data;

import java.util.Date;
@Data
public class CompteRequest {
    private double solde;
    private Date dateCreation;
    private TypeCompte type;
}
