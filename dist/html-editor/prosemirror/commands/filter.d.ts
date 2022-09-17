import { Command } from "../command";
import { Predicate } from "../predicate";
export declare const filter: (predicates: Predicate[] | Predicate, cmd: Command) => Command;
