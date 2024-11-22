package ma.projet.graph.entities;


import lombok.Data;

import java.time.LocalDate;

@Data
public class TransactionRequest {
    private double montant;
    private String description;
}
