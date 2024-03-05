


import java.util.Arrays;
import java.util.Scanner;

public class OrdenaNome {
    public static void main(String[] args) {
        try (Scanner scanner = new Scanner(System.in)) {
			String[] nomes = new String[10];

			// Leitura dos 10 nomes
			for (int i = 0; i < nomes.length; i++) {
			    System.out.print("Digite o " + (i + 1) + "º nome: ");
			    nomes[i] = scanner.nextLine();
			}

			// Ordenação alfabética
			Arrays.sort(nomes);

			// Exibição dos nomes ordenados
			System.out.println("\nNomes em ordem alfabética:");
			for (String nome : nomes) {
			    System.out.println(nome);
			}
		}
    }
}