import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Bet = {
  id: string;
  userId: string;
  sport: 'formula1' | 'basketball' | 'soccer';
  event: string;
  selection: string;
  amount: number;
  odds: number;
  potentialWin: number;
  placedAt: Date;
  status: 'pending' | 'won' | 'lost';
  settledAt?: Date;
};

type BetState = {
  bets: Bet[];
  addBet: (bet: Omit<Bet, 'id' | 'placedAt'>) => void;
  settleBet: (id: string, status: 'won' | 'lost') => void;
  getBetsByStatus: (status: Bet['status']) => Bet[];
  getPendingAmount: () => number;
};

export const useBetStore = create<BetState>()(
  persist(
    (set, get) => ({
      bets: [],
      addBet: (bet) => {
        const newBet: Bet = {
          ...bet,
          id: Math.random().toString(36).substring(2, 11),
          placedAt: new Date(),
          status: 'pending',
        };
        set((state) => ({ bets: [...state.bets, newBet] }));
      },
      settleBet: (id, status) => {
        set((state) => ({
          bets: state.bets.map((bet) =>
            bet.id === id
              ? { ...bet, status, settledAt: new Date() }
              : bet
          ),
        }));
      },
      getBetsByStatus: (status) => {
        return get().bets.filter((bet) => bet.status === status);
      },
      getPendingAmount: () => {
        return get().bets
          .filter((bet) => bet.status === 'pending')
          .reduce((total, bet) => total + bet.amount, 0);
      },
    }),
    {
      name: 'bet-storage',
    }
  )
);
