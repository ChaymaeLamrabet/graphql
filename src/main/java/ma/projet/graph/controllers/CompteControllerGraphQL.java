package ma.projet.graph.controllers;

import ma.projet.graph.entities.*;
import ma.projet.graph.repositories.CompteRepository;
import ma.projet.graph.repositories.TransactionRepository;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Controller
@AllArgsConstructor
public class CompteControllerGraphQL {

    private CompteRepository compteRepository;
    private TransactionRepository transactionRepository;

    @QueryMapping
    public List<Compte> allComptes() {
        return compteRepository.findAll();
    }

    @QueryMapping
    public List<Transaction> allTransactions() {
        return transactionRepository.findAll();
    }
    @QueryMapping
    public Compte compteById(@Argument Long id) {
        Compte compte = compteRepository.findById(id).orElse(null);
        if (compte == null) throw new RuntimeException(String.format("Compte %s not found", id));
        return compte;
    }

    @QueryMapping
    public List<Compte> comptesByType(@Argument TypeCompte type) {
        return compteRepository.findByType(type);
    }

    //MutationMapping
    //public Compte saveCompte(@Argument Compte comptep) {
        //if (comptep == null) {
        //    System.out.println("laa");
        //}
        // Parse the dateCreation string to LocalDate
        //LocalDate dateCreation = LocalDate.parse(comptep.getDateCreation().toString());

        // Convert LocalDate to Date
        //Date creationDate = Date.from(dateCreation.atStartOfDay(ZoneId.systemDefault()).toInstant());

        //Compte compte = new Compte();
        //compte.setSolde(comptep.getSolde());
        //compte.setDateCreation(creationDate);
        //compte.setType(comptep.getType());

        //return compteRepository.save(comptep);
    //}
    @MutationMapping
    public Compte saveCompte(@Argument CompteRequest compteRequest) {
        System.out.println("Received CompteRequest: " + compteRequest);


        if (compteRequest == null) {
            throw new RuntimeException("CompteRequest is null");
        }

        try {
            String rawDate = compteRequest.getDateCreation().toString();
            System.out.println("Raw dateCreation: " + rawDate);
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy");
            LocalDate dateCreation1 = LocalDate.parse(rawDate, formatter);

            // Parse dateCreation from String to LocalDate
            LocalDate dateCreation = LocalDate.parse((CharSequence) compteRequest.getDateCreation());

            // Convert LocalDate to Date (if needed)
            Date creationDate = Date.from(dateCreation1.atStartOfDay(ZoneId.systemDefault()).toInstant());

            // Map fields to Compte entity
            Compte compte = new Compte();
            compte.setSolde(compteRequest.getSolde());
            compte.setDateCreation(creationDate); // Use converted Date
            compte.setType(compteRequest.getType());

            // Save and return Compte
            return compteRepository.save(compte);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse dateCreation: " + e.getMessage());
        }
    }

    @MutationMapping
    public String deleteCompte(@Argument Long id) {
        if (!compteRepository.existsById(id)) {
            throw new RuntimeException(String.format("Compte %s not found", id));
        }
        compteRepository.deleteById(id);
        return String.format("Compte %s deleted successfully", id);
    }

    @QueryMapping
    public Map<String, Object> totalSolde() {
        long count = compteRepository.count(); // Nombre total de comptes
        double sum = compteRepository.sumSoldes(); // Somme totale des soldes
        double average = count > 0 ? sum / count : 0; // Moyenne des soldes

        return Map.of(
                "count", count,
                "sum", sum,
                "average", average
        );
    }

    @QueryMapping
    public List<Transaction> transactionsByCompteId(@Argument Long compteId) {
        if (!compteRepository.existsById(compteId)) {
            throw new RuntimeException(String.format("Compte %s not found", compteId));
        }
        return transactionRepository.findByCompteId(compteId);
    }

    @MutationMapping
    public Transaction addTransaction(@Argument Long compteId, @Argument TransactionRequest request) {
        Compte compte = compteRepository.findById(compteId)
                .orElseThrow(() -> new RuntimeException(String.format("Compte %s not found", compteId)));

        Transaction transaction = new Transaction();
        transaction.setCompte(compte);
        transaction.setMontant(request.getMontant());
        transaction.setDate(LocalDateTime.now());
        transaction.setDescription(request.getDescription());

        return transactionRepository.save(transaction);
    }
}
