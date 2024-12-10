from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.orm import declarative_base, relationship, sessionmaker
import os

connection_string = (
    "mssql+pyodbc://"
    "Sven:IEWeEiN!3Ch0A$@test123451.database.windows.net/Test"
    "?driver=ODBC+Driver+18+for+SQL+Server"
)
engine = create_engine(connection_string, echo=True)
SessionLocal = sessionmaker(bind=engine)
try:
    with engine.connect() as connection:
        print("Connection successful!")
except Exception as e:
    print(f"Error: {e}")
    
class Gruppen(Base):
    __tablename__ = "Gruppen"
    id = Column(Integer, primary_key=True, autoincrement=True)
    beschreibung = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False)

    mitglieder = relationship(
        "GruppenMitglieder",
        back_populates="gruppen",
        cascade="all, delete-orphan"
    )
    workouts = relationship(
        "GruppenWorkouts",
        back_populates="gruppen",
        cascade="all, delete-orphan"
    )
    
    
#Base.metadata.create_all(engine)