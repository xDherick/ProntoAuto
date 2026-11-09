import { calcularTotal } from '../services/osService.js';

export const moeda = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// Total calculado a partir dos itens (RF10, RF11).
export default function BudgetSummary({ itens }) {
  return (
    <div className="card">
      {itens.map((item) => (
        <div className="total-linha" key={item.descricao}>
          <span>{item.descricao}</span>
          <b>{moeda(item.quantidade * item.valorUnitario)}</b>
        </div>
      ))}
      <div className="total-linha total">
        <span>Total</span>
        <span>{moeda(calcularTotal(itens))}</span>
      </div>
    </div>
  );
}
